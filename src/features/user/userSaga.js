// src/features/users/userSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./userSlice";
import { userService } from "./userService";

function* fetchUsersWorker(action) {
  try {
    const { limit = 10, skip = 0, filters } = action.payload || {};
    //const filters = action.payload || {};

    const users = yield call(userService.fetchUsers, limit, skip, filters);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersWorker);
}
