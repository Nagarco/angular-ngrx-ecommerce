import { RouteConfig } from "@/common";

export class AuthEndPoints {
    static Auth = new RouteConfig('auth');
    static Login = new RouteConfig('login', AuthEndPoints.Auth);
}