export default function actionFactory(type) {
    return function action(payload){
        return {
            type, 
            payload
        }
    }
}