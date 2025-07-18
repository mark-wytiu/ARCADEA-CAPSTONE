import { useState } from 'react';
import { gameAPI } from '../../../services/api';

export const useSteamImport = (onImportComplete) => {
    const [openSteamImport, setOpenSteamImport] = useState(false);

    const handleSteamImportOpen = () => {
        setOpenSteamImport(true);
    };

    const handleSteamImportClose = () => {
        setOpenSteamImport(false);
    };

    const handleSteamImportComplete = async (totalImported) => {
        console.log(`${totalImported} games imported from Steam`);
        // Refresh the games list after import
        if (onImportComplete) {
            onImportComplete();
        }
        handleSteamImportClose();
    };

    return {
        openSteamImport,
        handleSteamImportOpen,
        handleSteamImportClose,
        handleSteamImportComplete
    };
};
