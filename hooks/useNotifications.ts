// useNotifications.ts
import * as Notifications from "expo-notifications";
import { useCallback, useEffect } from "react";

/**
 * Recommended pattern:
 * 1) Set the notification handler ONCE when this hook mounts (place this hook in your app root).
 * 2) Expose a function you can call from a button press to request permissions.
 *
 * This avoids iOS/TestFlight startup timing issues and keeps the permission prompt user-driven.
 */
export function useNotifications() {
  useEffect(() => {
    // Must include shouldShowAlert for broad Expo SDK compatibility.
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,

        // Newer iOS presentation options; safe to include.
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }, []);

  const requestNotificationPermissions = useCallback(async () => {
    try {
      const { status, granted, canAskAgain } =
        await Notifications.requestPermissionsAsync();

      // "granted" is a boolean; "status" is usually "granted"/"denied"/"undetermined"
      const isGranted = granted === true || status === "granted";

      return {
        granted: isGranted,
        status,
        canAskAgain: Boolean(canAskAgain),
      };
    } catch (e) {
      console.log("Notifications permission request failed:", e);
      return {
        granted: false,
        status: "error" as const,
        canAskAgain: false,
        error: e,
      };
    }
  }, []);

  return { requestNotificationPermissions };
}
