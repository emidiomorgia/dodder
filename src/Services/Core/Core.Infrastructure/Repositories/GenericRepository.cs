using Core.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : Entity
    {
        protected readonly DodderContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public GenericRepository(DodderContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public T Add(T entity)
        {
            return _context.Set<T>().Add(entity).Entity;
        }
        public void Update(T order)
        {
            _context.Entry(order).State = EntityState.Modified;
        }
        public T Remove(T entity)
        {
            return _context.Set<T>().Remove(entity).Entity;
        }

        public async Task<T> GetByIdAsync(int Id)
        {
            var entity = await _context.Set<T>()
                .Where(p => p.Id == Id)
                .FirstOrDefaultAsync();

            return entity;
        }


    }
}
