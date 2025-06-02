using System.Linq.Expressions;

namespace WAH.DAL.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
<<<<<<< HEAD
<<<<<<< HEAD
        Task<T?> GetByIdAsync(Guid id);
=======
        Task<T?> GetByIdAsync(int id);
        Task<T?> GetByGuidAsync(Guid id);
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
=======
        Task<T?> GetByIdAsync(int id);
        Task<T?> GetByGuidAsync(Guid id);
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<T> AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        void Update(T entity);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
        Task SaveChangesAsync();

        Task<T?> GetWithIncludeAsync(
            Expression<Func<T, bool>> predicate,
            params Expression<Func<T, object>>[] includes);

        Task<(IEnumerable<T> Data, int TotalCount)> GetPagedAsync(
            int pageNumber, int pageSize,
            Expression<Func<T, bool>>? filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null);

        IQueryable<T> GetAllQueryable();
<<<<<<< HEAD
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
    }
}
