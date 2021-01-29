import { User } from '../types';

// Anything we put into the apollo server context that we want to use later
type Context = {
  me: User,
  models: { [k: string] : any },
};

// A list of all the arguments and types that our queries expect
type Args = {
  id: string,
  text: string,
};

export type ResolverFunc = (parent: any, args: Args, context: Context) => any;
export type ResolverGroup = { [ k: string ] : ResolverFunc };
export type Resolvers = { [k: string] : ResolverGroup };
