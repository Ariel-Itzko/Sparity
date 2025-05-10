import my_app from './routes_object/app.route.js'


export const v1_routes = (app) => {
    app.use('/v1/app', my_app)
}
