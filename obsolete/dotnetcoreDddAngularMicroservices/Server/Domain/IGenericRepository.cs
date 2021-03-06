﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain
{

    public interface IGenericRepository<TEntity>
     where TEntity : class, IEntity
    {
        IQueryable<TEntity> GetAll();
        TEntity GetById(int id);
        TEntity Create(TEntity entity);
        TEntity Update(TEntity entity);
        void Delete(int id);
    }
}
