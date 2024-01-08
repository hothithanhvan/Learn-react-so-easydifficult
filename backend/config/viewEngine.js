import express from 'express';

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static('../backend/public'))
    app.set('view engine', 'ejs')
    app.set('views', "../backend/view")
}
export default configViewEngine