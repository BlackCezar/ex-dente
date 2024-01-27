import type { TSeo } from "~/types/global.type";

export function useSeo(title: string, seo?: TSeo) {
    if (seo) {
        useSeoMeta({
            ogImage:
                seo.sharedImage?.media
                    ?.data?.attributes?.url,
                ogImageUrl:
                    seo.sharedImage?.media
                        ?.data?.attributes?.url,
                ogImageAlt:
                    seo.sharedImage?.alt,
                title: title,
                ogTitle: title,
                keywords: seo.keywords,
                description:
                    seo.metaDescription,
                ogDescription:
                    seo.metaDescription,
        })
    } else {
        useHead({
            title
        })
    }
}