export default interface IChat {
    createdAt: string
    _id: string
    members: Array<{
        _id: string
        imageProfile: string
        username: string
        name: string
    }>
}