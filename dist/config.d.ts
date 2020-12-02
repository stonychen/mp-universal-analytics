declare const config: {
    protocolVersion: string;
    hostname: string;
    path: string;
    batchPath: string;
    batching: boolean;
    batchSize: number;
    acceptedParameters: string[];
    acceptedParametersRegex: RegExp[];
    parametersMap: {
        protocolVersion: string;
        trackingId: string;
        webPropertyId: string;
        anonymizeIp: string;
        dataSource: string;
        queueTime: string;
        cacheBuster: string;
        clientId: string;
        userId: string;
        sessionControl: string;
        ipOverride: string;
        userAgentOverride: string;
        documentReferrer: string;
        campaignName: string;
        campaignSource: string;
        campaignMedium: string;
        campaignKeyword: string;
        campaignContent: string;
        campaignId: string;
        googleAdwordsId: string;
        googleDisplayAdsId: string;
        screenResolution: string;
        viewportSize: string;
        documentEncoding: string;
        screenColors: string;
        userLanguage: string;
        javaEnabled: string;
        flashVersion: string;
        hitType: string;
        "non-interactionHit": string;
        documentLocationUrl: string;
        documentHostName: string;
        documentPath: string;
        documentTitle: string;
        screenName: string;
        linkId: string;
        applicationName: string;
        applicationId: string;
        applicationVersion: string;
        applicationInstallerId: string;
        eventCategory: string;
        eventAction: string;
        eventLabel: string;
        eventValue: string;
        transactionId: string;
        transactionAffiliation: string;
        transactionRevenue: string;
        transactionShipping: string;
        transactionTax: string;
        itemName: string;
        itemPrice: string;
        itemQuantity: string;
        itemCode: string;
        itemCategory: string;
        currencyCode: string;
        socialNetwork: string;
        socialAction: string;
        socialActionTarget: string;
        userTimingCategory: string;
        userTimingVariableName: string;
        userTimingTime: string;
        userTimingLabel: string;
        pageLoadTime: string;
        dnsTime: string;
        pageDownloadTime: string;
        redirectResponseTime: string;
        tcpConnectTime: string;
        serverResponseTime: string;
        domInteractiveTime: string;
        contentLoadTime: string;
        exceptionDescription: string;
        isExceptionFatal: string;
        "isExceptionFatal?": string;
        experimentId: string;
        experimentVariant: string;
    };
};
export default config;
