import { Model } from 'sequelize-typescript';

// Anything we put into the apollo server context that we want to use later
type Context = {
  current_user_id: number,
};

// A list of all the arguments and types that our queries expect
type Args = {
  id: string,
  text: string,
};

export type ResolverFunc = (parent: Model, args: Args, context: Context) => any;
export type ResolverGroup = { [ k: string ] : ResolverFunc };
export type Resolvers = { [k: string] : ResolverGroup };
