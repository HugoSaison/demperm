import socialApi from './social_api_config';

// -----------------------------------------------------------
// Interfaces de données (basées sur les schémas du Swagger)
// -----------------------------------------------------------

/** Structure du profil utilisateur public (utilisée pour la recherche et les profils publics) */
export interface UserPublicProfile {
  user_id: string;
  username: string;
  display_name: string;
  profile_picture_url: string;
  bio: string;
  location: string;
  created_at: string;
}

/** Structure complète des données de l'utilisateur actuel (GET /users/me) */
export interface CurrentUser {
  user_id: string;
  email: string;
  username: string;
  is_admin: boolean;
  is_banned: boolean;
  created_at: string;
  last_login_at: string | null;
  profile: {
    display_name: string;
    profile_picture_url: string;
    bio: string;
    location: string;
    privacy: 'public' | 'private';
  };
  settings: {
    email_notifications: boolean;
    language: string;
  };
}

/** Données pour la mise à jour partielle du profil (PATCH /users/me) */
export interface UpdateUserProfileData {
  username?: string;
  display_name?: string;
  profile_picture_url?: string;
  bio?: string;
  location?: string;
  privacy?: 'public' | 'private';
}

/** Données pour la mise à jour partielle des paramètres (PATCH /users/me/settings) */
export interface UpdateUserSettingsData {
  email_notifications?: boolean;
  language?: string;
}

// Simulation de la base de données
let mockUser: CurrentUser = {
    user_id: "7670601b-00b2-4b1b-a938-6074ec212651",
    email: "flavien@example.com",
    username: "Toulouuu",
    is_admin: false,
    is_banned: false,
    created_at: "2025-11-29T13:37:39Z",
    last_login_at: null,
    profile: {
        display_name: "Flavien Hallier",
        profile_picture_url: "https://via.placeholder.com/150",
        bio: "Ceci est ma bio hardcodée pour la démo.",
        location: "Paris, France",
        privacy: "public",
    },
    settings: {
        email_notifications: true,
        language: "fr"
    }
};

// -----------------------------------------------------------
// Fonctions d'appel à l'API
// -----------------------------------------------------------

/**
 * Récupère le profil complet de l'utilisateur actuellement authentifié.
 * Endpoint: GET /users/me/
 */
export const getCurrentUser = async (): Promise<CurrentUser> => {
  // const response = await socialApi.get<CurrentUser>('/users/me/');
  // return response.data;
  await new Promise(resolve => setTimeout(resolve, 500));
  return {...mockUser}
};

/**
 * Récupère le profil public d'un utilisateur par son ID.
 * Endpoint: GET /users/{user_id}/
 * @param userId L'ID de l'utilisateur à récupérer.
 */
// export const getUserPublicProfile = async (userId: string): Promise<UserPublicProfile> => {
//   const response = await socialApi.get<UserPublicProfile>(`/users/${userId}/`);
//   return response.data;
// };
export const getUserPublicProfile = async (userId: string): Promise<UserPublicProfile> => {
    console.log("[MOCK] GET /users/" + userId);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // On retourne le mockUser formaté pour l'interface UserPublicProfile
    return {
        user_id: userId,
        username: mockUser.username,
        display_name: mockUser.profile.display_name,
        profile_picture_url: mockUser.profile.profile_picture_url,
        bio: mockUser.profile.bio,
        location: mockUser.profile.location,
        created_at: mockUser.created_at
    };
};

/**
 * Met à jour le profil de l'utilisateur actuel.
 * Endpoint: PATCH /users/me/update/
 * @param data Les champs de profil à mettre à jour.
 */
// export const updateCurrentUserProfile = async (
//   profileUpdates: UpdateUserProfileData, 
// ): Promise<CurrentUser> => {
//   const response = await socialApi.patch<CurrentUser>('/users/me/update/', { data: profileUpdates });
  
//   return response.data;
// };
export const updateCurrentUserProfile = async (
    payload: UpdateUserProfileData | FormData
): Promise<CurrentUser> => {
    console.log("[MOCK] PATCH /users/me/update/", payload);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Gestion que ce soit du JSON ou du FormData (vu tes tests précédents)
    if (payload instanceof FormData) {
        mockUser.username = (payload.get('username') as string) || mockUser.username;
        mockUser.profile.display_name = (payload.get('display_name') as string) || mockUser.profile.display_name;
        mockUser.profile.bio = (payload.get('bio') as string) || mockUser.profile.bio;
        mockUser.profile.location = (payload.get('location') as string) || mockUser.profile.location;
        mockUser.profile.privacy = (payload.get('privacy') as 'public' | 'private') || mockUser.profile.privacy;
    } else {
        // Si c'est du JSON classique
        if (payload.username) mockUser.username = payload.username;
        if (payload.display_name) mockUser.profile.display_name = payload.display_name;
        if (payload.bio) mockUser.profile.bio = payload.bio;
        if (payload.location) mockUser.profile.location = payload.location;
        if (payload.privacy) mockUser.profile.privacy = payload.privacy;
    }

    return { ...mockUser };
};

/**
 * Met à jour les paramètres de l'utilisateur actuel.
 * Endpoint: PATCH /users/me/settings/
 * @param data Les paramètres à mettre à jour.
 */
export const updateCurrentUserSettings = async (
  data: UpdateUserSettingsData,
): Promise<UpdateUserSettingsData> => { // Le modèle de réponse est l'UpdateUserSettingsSerializer
  const response = await socialApi.patch<UpdateUserSettingsData>('/users/me/settings/', { data });
  return response.data;
};

/**
 * Recherche des utilisateurs par leur nom d'utilisateur.
 * Endpoint: GET /users/search/
 * @param query La chaîne de recherche.
 * @param page Le numéro de page (Défaut: 1).
 * @param pageSize La taille de la page (Défaut: 20).
 */
export const searchUsers = async (
  query: string,
  page: number = 1,
  pageSize: number = 20,
): Promise<UserPublicProfile[]> => {
  const response = await socialApi.get<UserPublicProfile[]>('/users/search/', {
    params: { query, page, page_size: pageSize },
  });
  return response.data;
};

/**
 * Bloque un utilisateur spécifique.
 * Endpoint: POST /users/{user_id}/block/
 * @param userId L'ID de l'utilisateur à bloquer.
 * @returns Vrai si l'opération a réussi (Code 204 attendu, donc pas de corps de réponse).
 */
export const blockUser = async (userId: string): Promise<boolean> => {
  await socialApi.post(`/users/${userId}/block/`);
  return true; // Si aucune exception n'est levée, c'est réussi (204)
};

/**
 * Débloque un utilisateur spécifique.
 * Endpoint: DELETE /users/{user_id}/unblock/
 * @param userId L'ID de l'utilisateur à débloquer.
 * @returns Vrai si l'opération a réussi (Code 204 attendu, donc pas de corps de réponse).
 */
export const unblockUser = async (userId: string): Promise<boolean> => {
  await socialApi.delete(`/users/${userId}/unblock/`);
  return true; // Si aucune exception n'est levée, c'est réussi (204)
};

/**
 * Récupère la liste des utilisateurs bloqués.
 * Endpoint: GET /users/me/blocked/
 * @param page Le numéro de page (Défaut: 1).
 * @param pageSize La taille de la page (Défaut: 20).
 */
export const getBlockedUsers = async (
  page: number = 1,
  pageSize: number = 20,
): Promise<UserPublicProfile[]> => {
  const response = await socialApi.get<UserPublicProfile[]>('/users/me/blocked/', {
    params: { page, page_size: pageSize },
  });
  return response.data;
};