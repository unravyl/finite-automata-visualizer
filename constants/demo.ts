export const demoManyRegex = [
    {
        regex: 'b.a*.b',
        nodes: [
            {
                id: 1,
                values: [1],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [2, 3],
                group: 1,
                isFinalState: false,
            },
            {
                id: 3,
                values: [4],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [4],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 3,
                    values: [4],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [4],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
        ],
        when: '2024-06-06T06:23:13.988Z',
        id: 10,
    },
    {
        regex: '(a|b)*.a.b*',
        nodes: [
            {
                id: 1,
                values: [1, 2, 3],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [1, 2, 3, 4, 5],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [1, 2, 3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [1, 2, 3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: 2,
                    values: [1, 2, 3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b,a',
            },
        ],
        when: '2024-06-06T06:23:06.727Z',
        id: 9,
    },
    {
        regex: 'a.b.b.a',
        nodes: [
            {
                id: 1,
                values: [1],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [2],
                group: 1,
                isFinalState: false,
            },
            {
                id: 3,
                values: [3],
                group: 1,
                isFinalState: false,
            },
            {
                id: 4,
                values: [4],
                group: 1,
                isFinalState: false,
            },
            {
                id: 5,
                values: [5],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 4,
                    values: [4],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 5,
                    values: [5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 5,
                    values: [5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
        ],
        when: '2024-06-06T06:21:48.170Z',
        id: 8,
    },
    {
        regex: 'b.a.b*.b',
        nodes: [
            {
                id: 1,
                values: [1],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [2],
                group: 1,
                isFinalState: false,
            },
            {
                id: 3,
                values: [3, 4],
                group: 1,
                isFinalState: false,
            },
            {
                id: 4,
                values: [3, 4, 5],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 4,
                    values: [3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 4,
                    values: [3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: 4,
                    values: [3, 4, 5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
        ],
        when: '2024-06-06T06:15:06.304Z',
        id: 7,
    },
    {
        regex: 'b.b.b.(a|b)*',
        nodes: [
            {
                id: 1,
                values: [1],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [2],
                group: 1,
                isFinalState: false,
            },
            {
                id: 3,
                values: [3],
                group: 1,
                isFinalState: false,
            },
            {
                id: 4,
                values: [4, 5, 6],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 4,
                    values: [4, 5, 6],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [4, 5, 6],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: 4,
                    values: [4, 5, 6],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b,a',
            },
        ],
        when: '2024-06-06T06:14:52.548Z',
        id: 6,
    },
    {
        regex: 'b.a.a*.b.a',
        nodes: [
            {
                id: 1,
                values: [1],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [2],
                group: 1,
                isFinalState: false,
            },
            {
                id: 3,
                values: [3, 4],
                group: 1,
                isFinalState: false,
            },
            {
                id: 4,
                values: [5],
                group: 1,
                isFinalState: false,
            },
            {
                id: 5,
                values: [6],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [3, 4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 4,
                    values: [5],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [5],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [5],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 5,
                    values: [6],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 5,
                    values: [6],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 5,
                    values: [6],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
        ],
        when: '2024-06-06T06:14:33.476Z',
        id: 5,
    },
    {
        regex: '(a|b)*',
        nodes: [
            {
                id: 1,
                values: [1, 2, 3],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b,a',
            },
        ],
        when: '2024-06-06T06:14:21.648Z',
        id: 4,
    },
    {
        regex: 'a*',
        nodes: [
            {
                id: 1,
                values: [1, 2],
                group: 1,
                isFinalState: true,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1, 2],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 1,
                    values: [1, 2],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: 1,
                    values: [1, 2],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'a',
            },
        ],
        when: '2024-06-06T06:14:11.876Z',
        id: 3,
    },
    {
        regex: 'a|b*.a.b',
        nodes: [
            {
                id: 1,
                values: [1, 2, 3],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [4, 5],
                group: 1,
                isFinalState: true,
            },
            {
                id: 3,
                values: [2, 3],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 4,
                values: [5],
                group: 1,
                isFinalState: true,
            },
            {
                id: 5,
                values: [4],
                group: 1,
                isFinalState: false,
            },
        ],
        links: [
            {
                source: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [4, 5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 2,
                    values: [4, 5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [4, 5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: 4,
                    values: [5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 3,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 5,
                    values: [4],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 3,
                    values: [2, 3],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 1,
                    values: [1, 2, 3],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 4,
                    values: [5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 4,
                    values: [5],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 5,
                    values: [4],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [4, 5],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
        ],
        when: '2024-06-06T06:13:56.800Z',
        id: 2,
    },
    {
        regex: 'a.b',
        nodes: [
            {
                id: 1,
                values: [1],
                group: 1,
                isFinalState: false,
            },
            {
                id: -1,
                values: [],
                group: 1,
                isFinalState: false,
            },
            {
                id: 2,
                values: [2],
                group: 1,
                isFinalState: false,
            },
            {
                id: 3,
                values: [3],
                group: 1,
                isFinalState: true,
            },
        ],
        links: [
            {
                source: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 1,
                    values: [1],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a',
            },
            {
                source: {
                    id: 2,
                    values: [2],
                    group: 1,
                    isFinalState: false,
                },
                target: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: true,
                },
                transition: 'b',
            },
            {
                source: {
                    id: 3,
                    values: [3],
                    group: 1,
                    isFinalState: true,
                },
                target: {
                    id: -1,
                    values: [],
                    group: 1,
                    isFinalState: false,
                },
                transition: 'a,b',
            },
        ],
        when: '2024-06-06T02:46:23.245Z',
        id: 1,
    },
];

export const demoSelectedRegex = demoManyRegex[5];
