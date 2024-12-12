module.exports = (plugin) => {
  plugin.controllers.auth.callback = async (ctx) => {
    const params = ctx.request.body;
    const { identifier, password } = params;
    const provider = ctx.params.provider || "local";

    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: {
        provider,
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      },
    });

    if (!user) {
      return ctx.badRequest(null, "Contraseña o usuario incorrectos");
    }

    const userLogin = await strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(password, user.password);

    if (!userLogin) {
      return ctx.badRequest(null, "Contraseña o usuario incorrectos");
    }

    const userWithImage = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch(user.id, {
      populate: ["avatar"],
    });

    const token = await strapi.plugins["users-permissions"].services.jwt.issue({
      id: userWithImage.id,
    });

    ctx.send({
      jwt: token,
      user: {
        ...user,
        avatar: userWithImage.avatar ? userWithImage.avatar.url : null,
      },
    });
  };

  return plugin;
};
