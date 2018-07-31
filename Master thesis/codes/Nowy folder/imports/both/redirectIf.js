import isLoggedIn from './isLoggedIn'

export default (url, conditionStatement)=>{
    const condition =  typeof conditionStatement === "function" 
        ? conditionStatement() 
        : conditionStatement
    return condition ? FlowRouter.go(url) : false
}