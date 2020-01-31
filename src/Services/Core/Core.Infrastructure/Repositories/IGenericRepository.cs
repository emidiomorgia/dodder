using Core.Domain.SeedWork;
using System.Threading.Tasks;

namespace Core.Infrastructure.Repositories
{
    public interface IGenericRepository<T> where T : Entity
    {
        IUnitOfWork UnitOfWork { get; }

        T Add(T entity);
        Task<T> GetByIdAsync(int Id);
        T Remove(T entity);
        void Update(T order);
    }
}