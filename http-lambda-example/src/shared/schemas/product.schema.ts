import { Static, Type } from '@sinclair/typebox';

const uuidv4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

const ProductKeySchema = Type.RegExp(uuidv4Regex);

const ProductSchema = Type.Object({
  display_name: Type.RegExp(nameRegex),
  email: Type.RegExp(emailRegex),
});

type ProductKeySchema = Static<typeof ProductKeySchema>;
type ProductSchema = Static<typeof ProductSchema>;

export { ProductKeySchema, ProductSchema };
