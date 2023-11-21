import { isRejectedWithValue,isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast"
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isPending(action)){
       toast.loading("Loading...",{id:"loading"})
    }
    if (isFulfilled(action) || isRejected(action) || isRejectedWithValue(action)){
        toast.remove("loading")
    }
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      toast.error(action?.payload?.message ?? "the universe collides...")
    }
    return next(action);
  };
