export const paths = {
    home: {
        show: {
            route: '/',
            view: () => ('home')
        }
    },
    sessions: {
        new: {
            route: '/sessions/new',
            view: () => ('sessions/new')
        },
        create: {
            route: '/sessions/new',
            view: () => ('sessions/new')
        },
        destroy: {
            route: '/sessions',
            dynamic: () => ('/sessions?_method=DELETE')
        }
    },
    users: {
        index: {
            route: '/users/',
            view: () => ('users/index')
        },
        new: {
            route: '/users/new',
            view: () => ('users/new')
        },
        create:  {
            route: '/users/',
        },
        edit: {
            route: '/users/:id/edit/',
            view: () => ('users/edit'),
            dynamic: (id: number) => ('/users/' + id + '/edit/'),
        },
        update: {
            route: '/users/:id',
            dynamic: (id: number) => ('/users/' + id + '?_method=PUT')
        },
        destroy: {
            route: '/users/:id',
            dynamic: (id: number) => ('/users/' + id + '?_method=DELETE')
        }
    }
}
