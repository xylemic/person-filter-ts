"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOfAge23 = exports.usersOfAge23 = exports.persons = void 0;
exports.logPerson = logPerson;
exports.filterPersons = filterPersons;
// Sample data for testing
exports.persons = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];
// Function to log a person
function logPerson(person) {
    console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}
/**
 * Fixes applied to `filterPersons` function:
 * - Changed `personType` from `string` to `'user' | 'admin'`
 * - Used generics `<T extends Person>` to enforce correct type inference
 * - Used `Omit<T, 'type'>` to exclude filtering by `type`
 * - Added a type predicate `(person): person is T` to ensure correct filtering
 */
function filterPersons(persons, personType, criteria) {
    return persons
        // Ensuring TypeScript knows the returned values are of type T
        .filter((person) => person.type === personType)
        .filter((person) => {
        let criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every((fieldName) => person[fieldName] === criteria[fieldName]);
    });
}
// Example usage of fixed function
exports.usersOfAge23 = filterPersons(exports.persons, 'user', { age: 23 });
exports.adminsOfAge23 = filterPersons(exports.persons, 'admin', { age: 23 });
// Logging results
console.log('Users of age 23:');
exports.usersOfAge23.forEach(logPerson);
console.log();
console.log('Admins of age 23:');
exports.adminsOfAge23.forEach(logPerson);
