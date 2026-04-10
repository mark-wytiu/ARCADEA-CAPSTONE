import { useState } from 'react';

export const useSteamImport = (onImportComplete) => {
    const [openSteamImport, setOpenSteamImport] = useState(false);

    const handleSteamImportOpen = () => {
        setOpenSteamImport(true);
    };

    const handleSteamImportClose = () => {
        setOpenSteamImport(false);
    };

    const handleSteamImportComplete = async ({ successCount = 0, failureCount = 0 } = {}) => {
        console.warn(`Steam import finished: ${successCount} saved, ${failureCount} failed`);
        if (successCount > 0 && onImportComplete) {
            onImportComplete();
        }
    };

    return {
        openSteamImport,
        handleSteamImportOpen,
        handleSteamImportClose,
        handleSteamImportComplete
    };
};
