'use strict';

/**
 * training-day service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::training-day.training-day');
