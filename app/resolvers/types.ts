import { Model } from 'sequelize-typescript';
import DataLoader from 'dataloader';

// Anything we put into the apollo server context that we want to use later
type Context = {
  current_user_id: number,
  loaders: Record<string, DataLoader<number, Model, new() => Model>>,
};

// A list of all the arguments and types that our queries expect.
// There's surely a better way to do this, without having to type out
// each arg and type on each resolver
type Args = {
  id: string,
  text: string,
  first: string,
  last: string,
  email: string,
  code: string,
  course_id: number,
  term_id: number,
  section_id: number,
  user_id: number,
  status: string,
  type: string,
};

export type ResolverFunc = (parent: Model, args: Args, context: Context) => any;
export type ResolverGroup = { [ k: string ] : ResolverFunc };
export type Resolvers = { [k: string] : ResolverGroup };
