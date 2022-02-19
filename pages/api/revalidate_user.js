
//http://localhost:3000/api/revalidate_user?secret=...&user_id=...
export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_SECRET_REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.unstable_revalidate('/user/' + req.query.user_id);
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}