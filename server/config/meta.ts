interface IMeta {
    [key: string]: {
        title: string,
        description: string,
        keyword?: string
    };
}

export const meta: IMeta = {
    home: {
        title: 'Hello Index',
        description: 'trivial description'
    },
    login: {
        title: 'Hello Login Form',
        description: 'login description'
    },
    secret: {
        title: 'Hi here is secret page!',
        description: 'secret description'
    },
};
