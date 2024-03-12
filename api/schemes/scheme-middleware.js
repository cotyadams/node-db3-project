const { find,
  findById,
  findSteps,
  add,
  addStep, } = require('./scheme-model');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const schemes = await find();
  let valid = false;
  schemes.map((scheme) => {
    if (scheme.scheme_id == req.params.scheme_id) {
      valid = true
    }
  })
  if (!valid) {
    res.status(404).json({
      message: `scheme with scheme_id ${req.params.scheme_id} not found`
    })
  } else next();
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if (
    typeof req.body.scheme_name !== 'string' ||
    req.body.scheme_name === '' ||
    !req.body.scheme_name
  ) {
    res.status(400).json({
      message: "invalid scheme_name"
    })
  } else next();
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if (
    typeof req.body.instructions !== 'string' ||
    req.body.instructions === '' ||
    !req.body.instructions
  ) {
    res.status(400).json({
      message: 'invalid step'
    })
  } else next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
