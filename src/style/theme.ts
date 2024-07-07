export type FontSize = "large" | "medium" | "small";
export type ButtonSize = "medium" | "small";
export type ButtonSheme = "primary" | "normal";

interface Theme {
    fontSize: {
        [key in FontSize]: {
            fontSize: string;
        };
    };
    button: {
        [key in ButtonSize]: {
            fontSize: string;
            padding: string;
        }
    };
    buttonScheme: {
        [key in ButtonSheme]: {
            color: string;
            backgroundColor: string;
        }
    };
};

export const theme: Theme = {
    fontSize: {
        large: {
            fontSize: '2rem'
        },
        medium: {
            fontSize: '1.5rem'
        },
        small: {
            fontSize: '0.9rem'
        }
    },
    button: {
        medium: {
            fontSize: '1rem',
            padding: '0.5rem 1rem'
        },
        small: {
            fontSize: '0.75rem',
            padding: '0.35rem 0.6rem'
        }
    },
    buttonScheme: {
        primary: {
            color: 'white',
            backgroundColor: '#0077B6'
        },
        normal: {
            color: 'black',
            backgroundColor: 'lightgray'
        },
    },
};