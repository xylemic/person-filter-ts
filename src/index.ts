// define User and Admin interfaces
interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

// define Person as a union of User and Admin
export type Person = User | Admin;

// sample data for testing
export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

// function to log a person
export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

export function filterPersons<T extends Person>(
    persons: Person[], 
    personType: T['type'], 
    criteria: Omit<Partial<T>, 'type'>
): T[] {
    return persons
        // ensuring TypeScript knows the returned values are of type T
        .filter((person): person is T => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Omit<T, 'type'>)[];
            return criteriaKeys.every((fieldName) => person[fieldName] === criteria[fieldName]);
        });
}

/*
// example usage of fixed function
export const usersOfAge23 = filterPersons<User>(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons<Admin>(persons, 'admin', { age: 23 });

// logging results
console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
*/

