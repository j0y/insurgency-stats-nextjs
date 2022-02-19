function avatarURL(hash) {
    if (hash === null) {
        return ''
    }

    return (
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/' +
        hash.substr(0, 2) +
        '/' +
        hash +
        '.jpg'
    );
}

export default avatarURL;