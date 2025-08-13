import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PORT: Joi.number().port(),
  SERVICE_PREFIX: Joi.string(),
  NODE_ENV: Joi.string()
    .valid('local', 'development', 'staging', 'production')
    .default('development'),
  GRPC_URL: Joi.string(),
  AUTH_SERVICE_GRPC_URL: Joi.string(),
  POSTGRES_HOST: Joi.alternatives().try(
    Joi.string().hostname(),
    Joi.string().ip({ version: ['ipv4', 'ipv6'] }),
  ),
  POSTGRES_PORT: Joi.number().port(),
  POSTGRES_USERNAME: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DATABASE: Joi.string(),
  POSTGRES_REPLICA_HOST: Joi.alternatives().try(
    Joi.string().hostname(),
    Joi.string().ip({ version: ['ipv4', 'ipv6'] }),
  ),
  POSTGRES_REPLICA_PORT: Joi.number().port(),
  POSTGRES_REPLICA_USERNAME: Joi.string(),
  POSTGRES_REPLICA_PASSWORD: Joi.string(),
  POSTGRES_REPLICA_DATABASE: Joi.string(),
});

export const EnvValidationOptions = {
  allowUnknown: true,
  abortEarly: true,
};