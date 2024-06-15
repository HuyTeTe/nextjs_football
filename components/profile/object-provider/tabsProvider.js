const PROFILE_TABS = [
    {
        'label': 'Profile',
        'position': 1,
        'route': 'profile',
    },
    {
        'label': 'Following Streak',
        'position': 2,
        'route': 'following-streak',
    },
    {
        'label': 'Streak history',
        'position': 3,
        'route': 'streak-history',
    },
    {
        'label': 'Result report',
        'position': 4,
        'route': 'report',
    },
    {
        'label': 'Follower',
        'position': 5,
        'route': 'follower',
    }
];

const SCREEN_RESPONSIVE_ITEMS = [
    {
        sizeFrom: '0',
        sizeTo: '480',
        itemCount: '1'
    },
    {
        sizeFrom: '481',
        sizeTo: '768',
        itemCount: '2'
    },
    {
        sizeFrom: '769',
        sizeTo: '1024',
        itemCount: '3'
    },
    {
        sizeFrom: '1025',
        sizeTo: '1200',
        itemCount: '4'
    },
    {
        sizeFrom: '1201',
        sizeTo: '99999',
        itemCount: '5'
    }
]

export { PROFILE_TABS, SCREEN_RESPONSIVE_ITEMS }