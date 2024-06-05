const usersSkillsMock = [
    {
        agentId: 1001,
        skillId: 1000,
        skillName: 'OBPhone',
        campaignName: 'Default'
    },
    {
        agentId: 1002,
        skillId: 1220,
        skillName: 'BS_IBPhone2',
        campaignName: 'SCH Campaign'
    },
    {
        agentId: 1003,
        skillId: 3831,
        skillName: 'IbEmail',
        campaignName: 'Default'
    }
];

export class UsersSkillsMock {
    public static getUsersSkillsMock(): any[] {
        return usersSkillsMock;
    }
}
