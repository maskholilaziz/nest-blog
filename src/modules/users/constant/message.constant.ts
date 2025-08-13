export const USER_MESSAGE = {
  EN: {
    /**
     * User messages
     */
    USER_NOT_FOUND: 'The user data was not found',
    USER_FOUND: 'The user data was found',
    ID_DOES_NOT_AVAILABLE: 'The user ID is not available',
    ID_DOES_NOT_EXIST: 'The user ID does not exist',
    FAILED_TO_REGISTER_USER: 'Failed to register a new user',
    SUCCESSFULLY_TO_REGISTER_USER: 'Successfully registered user',
    SUCCESSFULLY_TO_UPDATE_USER: 'Successfully update user',
    FAILED_TO_UPDATE_USER: 'Failed to update data user',
    ID_NUMBER_NOT_MATCH: 'NIK does not match',
    INVALID_REQUEST: 'Invalid request',
    SUCCESSFULLY_TO_CONFIRM_EMAIL: 'Successfully confirmed email',
    SUCCESSFULLY_FOUND_NOTIFICATIONS: 'Successfully found notifications',
    SUCCESSFULLY_UPDATED_NOTIFICATION: 'Successfully updated notification',

    /**
     * Email messages
     */
    SUCCESSFULLY_SENT_VERIFICATION_EMAIL:
      'Successfully sent verification email',
    SUCCESSFULLY_SENT_OTP_EMAIL:
      'Successfully sent OTP email',
    SUCCESSFULLY_VERIFIED_OTP_EMAIL:
      'Successfully verified OTP email',
    FAILED_TO_SEND_OTP_EMAIL:
      'Failed to send OTP email',
    FAILED_TO_VERIFY_OTP_EMAIL:
      'Failed to verify OTP email',
    SUCCESSFULLY_VERIFIED_OTP:
      'OTP successfully verified',
    FAILED_TO_VERIFY_OTP:
      'OTP verification failed',
    INVALID_OTP:
      'The OTP provided is not valid',
    EMAIL_DOES_NOT_AVAILABLE: 'The email does not available.',
    PHONE_NUMBER_DOES_NOT_AVAILABLE: 'The phone number does not available',
    FAILED_TO_VALIDATE_ID_NUMBER: 'Failed to validate the id number',
    SUCCESS_TO_VALIDATE_ID_NUMBER: 'Successfully validating user id number',
    TOO_MUCH_SEND_VERIFICATION_EMAIL: 'Too many requests for email verification. Please try again in a few minutes.',
    TOO_MUCH_CHECK_EMAIL: 'Too many requests for email checking. Please try again in a few minutes.',
  },
  ID: {
    /**
     * User messages
     */
    USER_NOT_FOUND: 'Data pengguna tidak ditemukan',
    USER_FOUND: 'Data pengguna ditemukan',
    ID_DOES_NOT_AVAILABLE: 'ID ini tidak tersedia',
    ID_DOES_NOT_EXIST: 'ID ini tidak ditemukan',
    FAILED_TO_REGISTER_USER: 'Gagal mendaftarkan pengguna baru',
    SUCCESSFULLY_TO_REGISTER_USER: 'Berhasil mendaftarkan pengguna',
    SUCCESSFULLY_TO_UPDATE_USER: 'Berhasil memperbaharui pengguna',
    FAILED_TO_UPDATE_USER: 'Gagal memperbaharui data pengguna',
    ID_NUMBER_NOT_MATCH: 'NIK tidak sesuai',
    SUCCESSFULLY_TO_CONFIRM_EMAIL: 'Berhasil memverifikasi email',
    INVALID_REQUEST: 'Permintaan tidak valid',
    SUCCESSFULLY_FOUND_NOTIFICATIONS: 'Berhasil menemukan notifikasi',
    SUCCESSFULLY_UPDATED_NOTIFICATION: 'Berhasil memperbaharui notifikasi',

    /**
     * Email messages
     */
    SUCCESSFULLY_SENT_VERIFICATION_EMAIL:
      'Berhasil mengirimkan email verifikasi',
    SUCCESSFULLY_SENT_OTP_EMAIL:
      'Berhasil mengirimkan email OTP',
    SUCCESSFULLY_VERIFIED_OTP_EMAIL:
      'Berhasil melakukan verifikasi email OTP',
    FAILED_TO_SEND_OTP_EMAIL:
      'Gagal mengirimkan email OTP',
    FAILED_TO_VERIFY_OTP_EMAIL:
      'Gagal melakukan verifikasi email OTP',
    SUCCESSFULLY_VERIFIED_OTP:
      'OTP berhasil diverifikasi',
    FAILED_TO_VERIFY_OTP:
      'OTP verifikasi gagal',
    INVALID_OTP:
      'OTP yang diberikan tidak valid',
    EMAIL_DOES_NOT_AVAILABLE: 'Email tidak tersedia.',
    PHONE_NUMBER_DOES_NOT_AVAILABLE: 'Nomor ponsel tidak tersedia.',
    FAILED_TO_VALIDATE_ID_NUMBER: 'Gagal memvalidasi nomor identitas',
    SUCCESS_TO_VALIDATE_ID_NUMBER: 'Berhasil mendapat data validasi nomor identitas',
    TOO_MUCH_SEND_VERIFICATION_EMAIL: 'Terlalu banyak permintaan untuk verifikasi email. Silakan coba lagi dalam beberapa menit.',
    TOO_MUCH_CHECK_EMAIL: 'Terlalu banyak permintaan untuk cek email. Silakan coba lagi dalam beberapa menit.',
  },
};

export const PASSWORD_MESSAGE = {
  EN: {
    NEW_PASSWORD_CANNOT_BE_THE_SAME: 'The new password cannot be the same as the old password',
    OLD_PASSWORD_DOES_NOT_MATCH: 'The old password does not match',
    NEW_PASSWORD_DOES_NOT_MATCH_WITH_CONFIRMATION_PASSWORD:
      'The new password does not match with confirmation password',
    SUCCESSFULLY_TO_UPDATE_PASSWORD: 'Successfully updated password',
    FAILED_TO_UPDATE_PASSWORD: 'Failed to update password',
    FAILED_TO_CREATE_PASSWORD: 'Failed to create password',
    SUCCESS_TO_GET_DAYS_UNTIL_EXPIRATION:
      'Successfully to get the number of days until expiration',
    FAILED_TO_GET_DAYS_UNTIL_EXPIRATION:
      'Failed to get the number of days until expiration',
    PASSWORD_NOT_FOUND: 'Password not found for the user',
  },
  ID: {
    NEW_PASSWORD_CANNOT_BE_THE_SAME:
      'Password baru tidak boleh sama dengan password lama',
    OLD_PASSWORD_DOES_NOT_MATCH: 'Password lama tidak sesuai',
    NEW_PASSWORD_DOES_NOT_MATCH_WITH_CONFIRMATION_PASSWORD:
      'Password baru tidak sesuai dengan konfirmasi password',
    SUCCESSFULLY_TO_UPDATE_PASSWORD: 'Berhasil memperbaharui password',
    FAILED_TO_UPDATE_PASSWORD: 'Gagal memperbaharui password',
    FAILED_TO_CREATE_PASSWORD: 'Gagal membuat password',
    SUCCESS_TO_GET_DAYS_UNTIL_EXPIRATION:
      'Berhasil mendapatkan jumlah hari sampai kedaluwarsa',
    FAILED_TO_GET_DAYS_UNTIL_EXPIRATION:
      'Gagal mendapatkan jumlah hari sampai kedaluwarsa',
    PASSWORD_NOT_FOUND: 'Password tidak ditemukan untuk pengguna tersebut',
  },
};

export const AUTH_MESSAGE = {
  ID: {
    TOKEN_EXPIRED: 'Token telah kedaluwarsa',
    TOKEN_INVALID: 'Token yang diberikan tidak valid',
    TOKEN_MISSING: 'Token tidak ditemukan',
    TOKEN_NOT_PROVIDED: 'Token tidak disediakan',
  },
  EN: {
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token provided',
    TOKEN_MISSING: 'Token not found',
    TOKEN_NOT_PROVIDED: 'Token not provided',
  },
};

export const EMAIL_MESSAGE = {
  ID: {
    FAILED_VERIFY_EMAIL_TOKEN_NOT_FOUND: 'Gagal memverfikasi email. Token tidak ditemukan.',
    FAILED_VERIFY_EMAIL_TOKEN_ALREADY_CONSUMED: 'Gagal memverfikasi email. Token telah digunakan.',
    FAILED_VERIFY_EMAIL_TOKEN_EXPIRED: 'Gagal memverfikasi email. Masa aktif token telah habis.',
    FAILED_VERIFY_EMAIL_INVALID_TOKEN: 'Gagal memverfikasi email. Token atau Email tidak valid.',
  },
  EN: {
    FAILED_VERIFY_EMAIL_TOKEN_NOT_FOUND: 'Failed to verify email. The token is not found.',
    FAILED_VERIFY_EMAIL_TOKEN_ALREADY_CONSUMED: 'Failed to verify email. The token is already consumed',
    FAILED_VERIFY_EMAIL_TOKEN_EXPIRED: 'Failed to verify email. The token is expired',
    FAILED_VERIFY_EMAIL_INVALID_TOKEN: 'Failed to verify email. Token or Email is invalid',
  },
};

export const CREDENTIAL_MESSAGE = {
  ID: {
    FAILED_TO_CREATE_ENCRYPTION_KEY: 'Gagal membuat data encryption key.',
  },
  EN: {
    FAILED_TO_CREATE_ENCRYPTION_KEY: 'Failed to create encryption key.',
  },
};

export const NOTIFICATION_CATEGORY = {
  SECURITY: 'keamanan',
  NOTIFICATIONS: 'pemberitahuan',
};

export const NOTIFICATION_SUB_CATEGORY = {
  NEW_LOGIN: 'new-login',
  FAILED_MFA: 'failed-mfa',
  BYPASS_MFA: 'bypass-mfa',
  DSC_APPROVAL: 'dsc-approval',
  FINANCIAL_APPROVAL: 'financial-approval',
  APP_CONSENT: 'app-consent',
  SECURITY_SETTING: 'security-setting',
  PROFILE_UPDATE: 'profile-update',
  CHANGE_PASSWORD: 'change-password',
  ACCOUNT_INTEGRATION: 'account-integration',
  RELATION_REQUESTOR: 'relation-requestor',
  RELATION_DELEGATOR: 'relation-delegator',
};