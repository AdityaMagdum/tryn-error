const acdUsersMock = [
    { agentId: 1001, userId: '11ea1626-fbbf-a2b0-9520-0242ac110002' },
    { agentId: 1002, userId: '11ea1626-fbbf-a2b0-9520-0242ac110003' },
    { agentId: 1003, userId: '11ea1626-fbbf-a2b0-9520-0242ac110004' }
];

export class AcdUsersMock {
    public static getAcdUsersDataMock(): any[] {
        return acdUsersMock;
    }
}
