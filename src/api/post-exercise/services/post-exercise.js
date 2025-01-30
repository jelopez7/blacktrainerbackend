'use strict';

/**
 * post-exercise service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-exercise.post-exercise');
