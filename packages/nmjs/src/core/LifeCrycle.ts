import { Context, Next } from 'koa';

export interface LifeCycle {
  preRequest?: (ctx: Context, next: Next) => void;
  postRequest?: (ctx: Context, next: Next) => void;
}
