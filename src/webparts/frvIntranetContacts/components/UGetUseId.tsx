import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export const getUserId = async (spHttpClient: SPHttpClient, absoluteUrl: string, inputEmailValue: string): Promise<number> => {
    try {
        const response: SPHttpClientResponse = await spHttpClient.get(`${absoluteUrl}/_api/web/siteusers?$filter=UserPrincipalName eq '${inputEmailValue.toLowerCase()}'`, SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.value.length > 0) {
                console.log(`Found user ... ${inputEmailValue.toLowerCase()}`);
                return data.value[0].Id;
            } else {
                console.log(`Not found user ... ${inputEmailValue.toLowerCase()}`);
                return -1;
            }
        } else {
            throw new Error(`Error getting user ... ${inputEmailValue.toLowerCase()}`);
        }
    } catch (error) {
        console.log(`Error getting user ID ... ${inputEmailValue.toLowerCase()}`);
        throw error;
    }
};
