type LangConstant = Record<string, string>;

const SERVER_MSGS: LangConstant = {
  dbConnectError: 'Ошибка подключения к базе данных!',
  dbConnectSuccess: 'Подключение к базе данных выполнено успешно!',
  serverStartSuccess: 'Сервер запущен успешно!',
  requestError: 'Во время выполнения запроса произошла непредвиденная ошибка!',
  badRequest: 'Введены некорректные данные!',
}

const USER_MSGS: LangConstant = {
  alreadyExist: 'Пользователь с таким именем уже существует!',
  createSuccess: 'Пользователь создан успешно!',
  loginSuccess: 'Авторизация прошла успешно!',
  invalidData: 'Введён неверный логин или пароль!',
}

export {
  SERVER_MSGS,
  USER_MSGS,
}