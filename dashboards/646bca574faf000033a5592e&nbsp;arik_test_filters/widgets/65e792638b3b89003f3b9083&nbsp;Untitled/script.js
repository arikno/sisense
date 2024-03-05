/*
Welcome to your Widget's Script.

To learn how you can access the Widget and Dashboard objects, see the online documentation at https://sisense.dev/guides/js/extensions
*/

widget.on('ready', function() {
  var dateFilterName = 'Date'; // Replace with your dashboard date filter name
  var secondDateFilterName = 'Date_Second'; // Replace with your widget date filter name


	
// ---------- Find Dashboard date filter ----------
  var dateFilter = widget.dashboard.filters.$$items.find(el => el.jaql.column == dateFilterName);

	
// ---------- Find Widget date filter ----------
  var filterPanel = widget.metadata.panels.find((item) => item.title == "filters");
  var secondDateFilter = filterPanel.items.find((item) => item.jaql.title == secondDateFilterName);
	
	
  var selectedYear = dateFilter.jaql.filter.members[0].slice(0, 4);

	
  if (dateFilter && secondDateFilter) {
	
// set fromDate
  var fromDate = selectedYear + "-01-01";
    
// set toDate
  var selectedMonth = dateFilter.jaql.filter.members[0].slice(5, 7);
  var endOfMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  var toDate = selectedYear + "-" + selectedMonth + "-" + endOfMonth;

 // Update the widget date filter
  secondDateFilter.jaql.filter.from = fromDate;
  secondDateFilter.jaql.filter.to = toDate;
  }
	
});


