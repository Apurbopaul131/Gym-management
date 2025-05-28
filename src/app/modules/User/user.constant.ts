export const role = ['Admin', 'Trainer', 'Trainee'];
export const USER_ROLE = {
  Admin: 'Admin',
  Trainer: 'Trainer',
  Trainee: 'Trainee',
} as const;
export type TUserRole = keyof typeof USER_ROLE;
