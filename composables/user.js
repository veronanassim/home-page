export const user =  () => {
    let user =  useAuth().data.value.user;
    return user 
}