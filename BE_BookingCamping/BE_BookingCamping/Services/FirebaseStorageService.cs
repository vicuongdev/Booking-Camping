using Firebase.Storage;

namespace BE_BookingCamping.Services
{
    public class FirebaseStorageService
    {
        private readonly string _authToken; // API Key
        private readonly string _bucket; // ID của dự án Firebase

        public FirebaseStorageService(string authToken, string bucket)
        {
            _authToken = authToken;
            _bucket = bucket;
        }

        public FirebaseStorage GetFirebaseStorageInstance()
        {
            return new FirebaseStorage(_bucket, new FirebaseStorageOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(_authToken)
            });
        }
    }
}
