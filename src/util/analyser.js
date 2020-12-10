async function getPictures(text) {
    if (!text) return [];

    // get links in post and avoid duplicates
    let pictures = [
        ...text.matchAll(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]*\.[a-zA-Z0-9]*\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g),
    ].map((res) => res[0]);

    // cancel if no pictures
    if (!pictures) return {};

    pictures = await Promise.all(
        pictures.map(async (t) => {
            if (/imgur\.com\/a\//.test(t)) {
                // timestamp is imgur album
                let hash = t.split('/').pop();
                let resImages = await fetch(`https://api.imgur.com/3/album/${hash}/images`, {
                    headers: {
                        Authorization: 'Client-ID 18506a441ae08ca',
                    },
                });
                if (!resImages.ok) {
                    console.warn(`Invalid Imgur album! Cannot resolve ${t}`);
                    return [];
                }
                let jsonImages = await resImages.json();
                let images = jsonImages.data;
                if (images.constructor !== Array) {
                    images = images.images;
                }
                return images.map((img) => img.link);
            } else if (/imgur\.com\/gallery\//.test(t)) {
                // timestamp is imgur gallery
                let hash = t.split('/').pop();
                let resImages = await fetch(`https://api.imgur.com/3/gallery/${hash}`, {
                    headers: {
                        Authorization: 'Client-ID 18506a441ae08ca',
                    },
                });
                if (!resImages.ok) {
                    console.warn(`Invalid Imgur gallery! Cannot resolve ${t}`);
                    return [];
                }
                let jsonImages = await resImages.json();
                return jsonImages.data.images.map((img) => img.link);
            } else if (/imgur\.com\/[A-Za-z0-9]*$/.test(t)) {
                // timestamp is imgur photo
                t = `https://i.imgur.com/${t.split('/').pop()}.jpg`;
            }
            return t;
        })
    );

    // flatten and remove non-images
    pictures = pictures.flat().filter((t) => {
        return /\.(png|jpg|jpeg|gif|webp)\/?$/.test(t);
    });

    return [...new Set(pictures)];
}

export default { getPictures };
