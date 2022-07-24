export const AUTH_ROLES = {
  'ADMIN': 'ADMIN',
};


export function isAdmin(roles: string[]): boolean {
  return roles.includes(AUTH_ROLES.ADMIN);
}
