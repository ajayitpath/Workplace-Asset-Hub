

using System.Data;
using WAH.Common.DtoModels.AuthDtos;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.BLL.Mappers.AuthMappers
{
    public static class UserMapper
    {
        //TempUserEntity to a UserEntity
        //public static UserEntity MapToUserEntity(TemporaryUserEntity tempUser, Guid? creatorId)
        //{
        //    return new UserEntity
        //    {
        //        FirstName = tempUser.FirstName,
        //        LastName = tempUser.LastName,
        //        Email = tempUser.Email,
        //        Password = tempUser.Password,
        //        PhoneNumber = tempUser.PhoneNumber,
        //        Gender = tempUser.Gender,
        //        DOB = tempUser.DOB,
        //        DeskNo = tempUser.DeskNo,
        //        Role = tempUser.Role, // Assuming Role is eagerly loaded or retrieved
        //        IsActive = true,
        //        UserAudit = new UserAuditEntity
        //        {
        //            Id = Guid.NewGuid(),
        //            CreateDate = DateTime.UtcNow,
        //            CreatedBy = creatorId ?? tempUser.Id, // Set self if created by self
        //            UserId = tempUser.Id
        //        },
        //    };
        //}

        public static UserEntity FromTempUser(TemporaryUserEntity tempUser, Guid? creatorId)
        {
            var userId = Guid.NewGuid(); // Pre-generate user ID to use for both User and UserAudit

            return new UserEntity
            {
                Id = userId,
                FirstName = tempUser.FirstName,
                LastName = tempUser.LastName,
                Email = tempUser.Email,
                Password = tempUser.Password,
                PhoneNumber = tempUser.PhoneNumber,
                Gender = tempUser.Gender,
                DOB = tempUser.DOB,
                DeskNo = tempUser.DeskNo,
                Role = tempUser.Role,
                IsActive = true,
                UserAudit = new UserAuditEntity
                {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.UtcNow,
                    CreatedBy = creatorId ?? userId, // if no JWT user, fallback to self
                    UserId = userId
                },
                UserProfile = new UserProfileEntity
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    ProfileImage = null // set a default if needed
                }
            };
        }

        public static TemporaryUserEntity MapToTemporaryUserEntity(
       RegisterDto model,
       RoleEntity role,
       string hashedPassword,
       string otp,
       DateTime expiryTime)
        {
            return new TemporaryUserEntity
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = hashedPassword,
                ConfirmPassword = model.ConfirmPassword,
                PhoneNumber = model.PhoneNumber,
                Gender = model.Gender,
                DOB = model.DOB,
                DeskNo = model.DeskNo,
                RoleId = role.Id,
                Role = role,
                OTP = otp,
                ExpiryTime = expiryTime
            };
        }


      
            public static UserEntity MapToUserEntity(
                TemporaryUserEntity tempUser,
                Guid? createdById = null // Pass null if user self-registers
            )
            {
                var newUserId = Guid.NewGuid(); // Generate ID for the new user

                return new UserEntity
                {
                    Id = newUserId,
                    FirstName = tempUser.FirstName,
                    LastName = tempUser.LastName,
                    Email = tempUser.Email,
                    Password = tempUser.Password,
                    ConfirmPassword = tempUser.ConfirmPassword,
                    PhoneNumber = tempUser.PhoneNumber,
                    Gender = tempUser.Gender,
                    DOB = tempUser.DOB,
                    DeskNo = tempUser.DeskNo,
                    Role = tempUser.Role,
                    IsActive = true,

                    UserAudit = new UserAuditEntity
                    {
                        Id = Guid.NewGuid(),
                        CreateDate = DateTime.UtcNow,
                        CreatedBy = createdById ?? newUserId, // If createdById is null, set self
                        UserId = newUserId
                    },

                    UserProfile = new UserProfileEntity
                    {
                        Id = Guid.NewGuid(),
                        UserId = newUserId,
                        ProfileImage = null
                    },

                    AssetRequests = new List<AssetRequestEntity>(),
                    AssetAssignments = new List<AssetAssignmentEntity>()
                };
            }
        


    }
}
