const validate = {};

validate.notEmty = async (fields) => {
  const emtyFields = await fields.filter((field) => field.length === 0);
  if (emtyFields.length > 0) {
    return false;
  }
  return true;
};

export default validate;
