import { UserActionTypes } from './user.types';

export const emailSignInStart = (emailAndPasswordData) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPasswordData,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const updateUserStart = (user_id, data) => {
  console.log('action data', data, 'action user id', user_id);
  return {
    type: UserActionTypes.UPDATE_USER_START,
    payload: { user_id: user_id, data: data },
  };
};

export const updateUserSuccess = (message) => {
  return {
    type: UserActionTypes.UPDATE_USER_SUCCESS,
    payload: message,
  };
};

export const updateUserFailure = (error) => {
  return {
    type: UserActionTypes.UPDATE_USER_SUCCESS,
    payload: error,
  };
};

// export const fetchUserStartAsync = () => {
//   //using async/await

//   return async (dispatch) => {
//     try {
//       //   dispatch(fetchUserStart());
//       //   let allCourses = await fetch('/all-courses');
//       //   allCourses = await allCourses.json();
//       //   allCourses = allCourses.courses;
//       //   dispatch(fetchAllCoursesSuccess(allCourses));
//     } catch (error) {
//       //   dispatch(fetchAllCoursesFailure(error.message));
//     }
//   };
// };
