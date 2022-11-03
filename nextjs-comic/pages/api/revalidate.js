export default async function handler(req, res) {
  // ensure the request is valid, with a secret or
  // other mechanism
  if (!isValidRequest(req)) {
    return res.status(401).json({ message: 'Invalid request' })
  }

  try {
    // identify which page path to revalidate, e.g. /blog/foo-post
    const pathToRevalidate = getPathToRevalidate(req)

    console.log(`revalidating... path: ${pathToRevalidate}`)

    // revalidate the page
    await res.unstable_revalidate(pathToRevalidate)

    console.log(`revalidate success for path ${pathToRevalidate}`)

    return res.status(200).json({ revalidated: true })
  } catch (err) {
    console.log(err)
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}

const isValidRequest = (req) => {
  // Check for secret to confirm this is a valid request
  return req.query.secret === process.env.BACKEND_REVALIDATE_SECRET
}
const getPathToRevalidate = (req) => {
  return req.body.path_to_revalidate
}
