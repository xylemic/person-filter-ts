# FilterPersons TypeScript Application

This application filters an array of `Person` objects (`User` or `Admin`) based on type and criteria. It fixes the typing issues in the `filterPersons` function while maintaining strict type safety.

---

## The Problem

The original `filterPersons` function had several issues:
- It used `string` for `personType`, losing type safety.
- It accepted `unknown` for `criteria`, leading to unchecked property access.
- It did not restrict filtering by `type`, which could cause inconsistent results.

---

## The Solution

### Key Fixes:
1. **Strong Typing with Generics:**
   - Used `<T extends Person>` to infer the return type dynamically.
   - `personType` is now strictly `'user'` or `'admin'`.

2. **Type-Safe Criteria:**
   - Used `Omit<Partial<T>, 'type'>` to:
     - Allow partial filtering (`age`, `name`, `occupation`, `role`).
     - Prevent filtering by `type`.

3. **Type Guard for Type Inference:**
   - Added a type predicate to help TypeScript correctly infer the type after filtering by `personType`.

---

## Code Implementation

```ts
// Interfaces for User and Admin
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

// Union Type
export type Person = User | Admin;

// Sample Data
export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

// Logging Helper
export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

/**
 * Enhanced filterPersons function
 * - Uses Generics `<T extends Person>` for accurate type inference.
 * - Ensures `personType` is either 'user' or 'admin'.
 * - Accepts partial criteria while excluding `type`.
 * - Utilizes a type guard for safe filtering.
 */
export function filterPersons<T extends Person>(
    persons: Person[], 
    personType: T['type'], 
    criteria: Omit<Partial<T>, 'type'>
): T[] {
    return persons
        .filter((person): person is T => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Omit<T, 'type'>)[];
            return criteriaKeys.every((fieldName) => person[fieldName] === criteria[fieldName]);
        });
}

// example usage
export const usersOfAge23 = filterPersons<User>(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons<Admin>(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
