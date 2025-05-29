namespace WAH.DAL.EntityModels.AuthEntities
{
    public class RoleEntity
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public bool isActive { get; set; } = true;

        public ICollection<UserEntity> Users { get; set; } = new List<UserEntity>();
    }
}