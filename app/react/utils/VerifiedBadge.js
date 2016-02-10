export default function VerifiedBadge(provider) {
  const verified_image = {
    facebook: 'https://w-playlist.s3.amazonaws.com/images/facebook-verified.png',
    twitter: 'https://w-playlist.s3.amazonaws.com/images/verified.png'
  }
  return verified_image[provider];
}